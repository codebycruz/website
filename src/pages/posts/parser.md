---
title: "Writing a dead simple language in Lua"
desc: ""
published: 2025-11-22
layout: "../../layouts/Post.astro"
tags: ["Lua", "Compilers", "Programming", "Tutorial"]
---

Writing a language doesn't have to be hard. You don't have to take formal courses in compilers, implement advanced iterative parsing algorithms, nor does it have to be thousands of lines long.

I've written tons of languages, and it's safe to say I've practically mastered it in Lua, although a lot of these concepts can be applied to other languages.

Before we start, make sure you have a working Lua environment and a solid grasp of Lua.

# Tokenization

The first step is tokenization. This step is necessary as it breaks the source code down into manageable tokens which you can understand the context of, ie a keyword being different from a variable name (an "identifier"). Also, it speeds up the parsing step.

The key with Lua is it comes with a powerful pattern matching library you can take advantage of to make this process easier. Also, it will 99% of the time be faster than writing it on your own (unless you're writing fine tuned LuaJIT).

```lua
-- tokenizer.lua
local function tokenize(src)
    local tokens = {}
    local i, len = 1, #src

    -- This is the core function you'll be using
    -- This is a function inside of a function, it uses the `src` and `i` variables from the outer function
    -- @param pattern string The Lua pattern to match
    -- @return string? The matched string, or nil if no match
    local function consume(pattern)
        local start, finish, match = string.find(src, pattern, i)
        if start then
            i = finish + 1
            return match
        end
    end

    -- tbd
end
```

## The `consume` function

This is going to be the core of our tokenizer. It will simply run a lua pattern (lua's equivalent of a RegExp) against the source code starting at the current pointer `i`. If it finds a match, it will move the pointer forward and return the matched string.

So you can easily implement a pattern to match for a number where you currently are as such:

```lua
-- Crucially, the pattern must start with a ^ to indicate the start of the string at the current position
-- Also, wrap the expression you want to be returned in parentheses
local number = consume("^(%d+)")
if number then
    -- Don't forget to tonumber() it, as consume returns a string
    table.insert(tokens, { type = "number", value = tonumber(number) })
end
```

Let's do that.

```lua
-- tokenizer.lua
local function tokenize(src)
    local tokens = {}
    local i, len = 1, #src

    -- This is the core function you'll be using
    local function consume(pattern)
        local start, finish, match = string.find(src, pattern, i)
        if start then
            i = finish + 1
            return match
        end
    end

    while true do
        if consume("%s+") then
            -- Ignore whitespace
        end

        if i > len then
            break
        end

        local number = consume("^(%d+)")
        if number then
            table.insert(tokens, { type = "number", value = tonumber(number) })
            goto continue
        end

        -- Match other stuff

        ::continue::
    end
end
```

## Strings...

The previous consume() function is perfect and will handle pretty much all of your needs, except for things like strings. The problem with Strings is that they can have quotes inside of them due to escapes. So you're gonna have to parse them the old fashioned way.

```lua
if string.char(src, i, i) == '"' then
    i = i + 1

    local str = "" -- The string we're building
    while i <= len do
        local char = string.char(src, i, i)

        if char == '"' then
            i = i + 1
            break
        end

        if char == "\\" then
            i = i + 1

            local nextChar = string.char(src, i, i)
            if nextChar == "n" then
                str = str .. "\n"
            elseif nextChar == "t" then
                str = str .. "\t"
            else -- Not a valid escape, just add the char as is
                str = str .. nextChar
            end
        else
            str = str .. char
        end

        i = i + 1
    end

    table.insert(tokens, { type = "string", value = str })
    goto continue
end
```

Additionally, this currently depends on string concatenation, which isn't ideal in Lua, as strings are immutable. Basically, it allocates memory every single time you add to a string. A better approach is to use a table and table.concat() at the end.

```diff
if string.char(src, i, i) == '"' then
    i = i + 1

-   local str = "" -- The string we're building
+   local str = {} -- The string parts we're building
    while i <= len do
        local char = string.char(src, i, i)

        if char == '"' then
            i = i + 1
            break
        end

        if char == "\\" then
            i = i + 1

            local nextChar = string.char(src, i, i)
            if nextChar == "n" then
-               str = str .. "\n"
+               table.insert(str, "\n")
            elseif nextChar == "t" then
-               str = str .. "\t"
+               table.insert(str, "\t")
            else -- Not a valid escape, just add the char as is
-               str = str .. nextChar
+               table.insert(str, nextChar)
            end
        else
-           str = str .. char
+           table.insert(str, char)
        end

        i = i + 1
    end

+   local finalStr = table.concat(str)
    table.insert(tokens, { type = "string", value = finalStr })
    goto continue
end
```

## Identifiers, Keywords and Operators

This one is quite simple using our consume() function.
Beforehand, you should have a table storing all "special" keywords and operators as a lookup table.

You can separate the keywords and operators, I often just put them together for simplicity.

```lua
local special = {"if", "else", "while", "function", "+", "-", "*", "/"}
for _, kw in ipairs(special) do -- Make it a lookup table for O(1) access
    special[kw] = true
end
```

```lua
local identifier = consume("^(%a[%w_]*)")
if identifier then
    -- Check if it's a keyword
    if special[identifier] then
        table.insert(tokens, { type = identifier })
    else
        table.insert(tokens, { type = "identifier", value = identifier })
    end

    goto continue
end
```

For operators, we won't be using consume() since operators can be multiple characters long, and we want to match the longest possible operator first.

```lua
if i <= len - 2 then
    -- This check is CRUCIAL! if we don't check this, string.sub will clip to the smallest possible string and increment i incorrectly.
    local op3 = string.sub(src, i, i + 2)
    if special[op3] then
        table.insert(tokens, { type = op3 })
        i = i + 3
        goto continue
    end
end

if i <= len - 1 then
    local op2 = string.sub(src, i, i + 1)
    if special[op2] then
        table.insert(tokens, { type = op2 })
        i = i + 2
        goto continue
    end
end

if i <= len then
    local op1 = string.sub(src, i, i)
    if special[op1] then
        table.insert(tokens, { type = op1 })
        i = i + 1
        goto continue
    end
end
```

So that's pretty much everything for our tokenizer, it's a pretty simple step, but we shaved off a ton of extra code with that neat `consume()` function.

# Parser

The parser is where we take the tokens we generated in the previous step and turn them into an Abstract Syntax Tree (AST).

Basically, we want to convert a flat array of just { "if", "true", "then" ... } into something nice like { type = "if", condition = <EXPR>, block = <STMT> } which is a STMT itself.

To help with this, we'll replicate the `consume()` function from before, but this time it will consume tokens instead of characters.

```lua
-- parser.lua
local function parse(tokens)
    local i, len = 1, #tokens

    local function consume(expectedType)
        local token = tokens[i]
        if token and token.type == expectedType then
            i = i + 1
            return token
        end
    end

    -- tbd
end
```

As you can see, it's pretty much the same as before, except now it checks the type of the current token instead of matching a pattern.

Now, I like structuring my parser in tiny functions which parse what they're responsible for and naming it simply that. Ie, `expr()` for an expression (a number, string, etc) or `stmt()` for a statement (if, while, etc).

I also like simply having them return nil and having no effect upon the parser if they fail to parse anything, which makes it easy to chain them together.

## Expressions

We're gonna start with expressions, even if statements are easier.
The thing you need to understand is that expressions are complicated.

For example, this whole thing `1 + 2 * 3 - 4 / 5` is a single expression but is going to turn into a nested structure in the AST, and of course you need to ensure it follows your order of operations (PEMDAS).

To do this, let's first parse an `atom()` which is the simplest form of expression, like those numbers there, strings, and identifiers, ignoring operators for now.

```lua
-- Keep this local so we can use expr() inside of the atom() function, even if it's defined later
local expr

local function atom()
    local number = consume("number")
    if number then
        return { type = "number", value = number.value }
    end

    local str = consume("string")
    if str then
        return { type = "string", value = str.value }
    end

    local id = consume("identifier")
    if id then
        return { type = "identifier", value = id.value }
    end
end
```

As a bonus, we can implement grouped expressions here too, like `(1 + 2)`, by checking for parentheses.
Add this to the start of the `atom()` function:

```lua
if consume("(") then
    local exprNode = assert(expr(), "Expected expression after '('")
    assert(consume(")"), "Expected closing parenthesis")
    return exprNode
end
```

### Expressions: Operators and Precedence

Now here's the scary part. There's a lot of ways to implement operator precedence, each with their own tradeoffs.

You can implement an iterative, performant algorithm like Shunting Yard, but its quite complex to implement and understand, and for most cases, you really don't need that level of performance.

I'm going to implement a recursive descent parser, which is incredibly simple, but do note that it is _recursive_, so you'll eventually hit parsing limits if you have too deeply nested expressions. But that's a tradeoff I'm willing to make for simplicity.

The idea is to have multiple levels of expression parsing functions, each responsible for a certain level of precedence.

```lua
local function foldLeft(inner, ops)
    local initial = inner()
    if not initial then
        return nil
    end

    local lhs = initial
    while i <= len do
        local op = nil
        for _, opType in ipairs(ops) do
            local matched = consume(opType)
            if matched then
                op = matched
                break
            end
        end

        if not op then
            break
        end

        local rhs = assert(inner(), "Expected expression after " .. op.type .. " operator")
        lhs = {type = op.type, lhs = lhs, rhs = rhs}
    end

    return lhs
end
```

So, this might look complicated, but it's basically just a nice helper function to avoid having to create like 5 different functions for each precedence level.

It's basically identical to doing

```lua
local function mulDiv()
    local lhs = atom()
    while true do
        local op = consume("*") or consume("/")
        if not op then break end
        local rhs = assert(atom(), "Expected expression after " .. op.type .. " operator")
        lhs = {type = op.type, lhs = lhs, rhs = rhs}
    end
    return lhs
end

local function addSub()
    local lhs = mulDiv()
    while true do
        local op = consume("+") or consume("-")
        if not op then break end
        local rhs = assert(mulDiv(), "Expected expression after " .. op.type .. " operator")
        lhs = {type = op.type, lhs = lhs, rhs = rhs}
    end
    return lhs
end

local function expr()
    return addSub()
end
```

## Statements

These are pretty simple now from your work on expressions. Let's do a while loop.

```lua
local function stmt()
    if consume("while") then
        local condition = assert(expr(), "Expected expression after 'while'")
        assert(consume("do"), "Expected 'do' after while condition")

        -- You can also turn this into a helper function, but for simplicity, we'll just do it here
        local block = {}
        while true do
            local statement = stmt()
            if not statement then
                break
            end
            table.insert(block, statement)
        end

        assert(consume("end"), "Expected 'end' to close while statement")

        return { type = "while", condition = condition, block = block }
    end

    -- Add more statements here...

    return nil
end
```

## Putting it all together

Finally, we just need to put everything together in the main parse function.

```lua
local function parse(tokens)
    local i, len = 1, #tokens

    -- ...

    local stmts = {}
    while i <= len do
        local statement = stmt()
        if not statement then
            error("Unexpected token: " .. tokens[i].type)
        end

        table.insert(stmts, statement)
    end

    return stmts
end
```

# What now?

Now that's all the work on your tokenizer and parser done.
You have a few options as to what to do here.

You can make an interpreter, as in, you loop through the AST and execute it directly. (As an optimization, most languages "compile" the AST into bytecode for this beforehand, though.)

Or you can transpile it, as in, convert the AST into another language's source code, like convert that ast to Lua and use `load()` to compile and run it.

The last option is to compile it to machine code but that's not really applicable for Lua.

Regardless, both options are really easy for a dynamically typed language. If you were working with a typed language, you'd have an "analysis" step here to ensure that

1. You're using variables that exist
2. The types match up correctly

## Interpreter Example

Here's a simple interpreter that can handle while loops and basic arithmetic expressions.

```lua
local function interpret(ast)
    local env = {}

    local function expr(node)
        if node.type == "number" then
            return node.value
        elseif node.type == "+" then
            return expr(node.lhs) + expr(node.rhs)
        elseif node.type == "-" then
            return expr(node.lhs) - expr(node.rhs)
        -- Add more operators here...
        end
    end

    local function stmt(node)
        if node.type == "while" then
            while expr(node.condition) do
                for _, stmt in ipairs(node.block) do
                    stmt(stmt)
                end
            end
        end

        -- Add more statements here...
    end

    for _, stmt in ipairs(ast) do
        execStmt(stmt)
    end
end

local tokens = tokenize(sourceCode)
local ast = parse(tokens)
interpret(ast)
```

And there you have it! A dead simple language parser and interpreter in Lua.

Here's your homework.

1. Extend the tokenizer to store the "span" (start and end position) of each token for better error reporting. Upon resolving the token, given the source code, you can resolve the line and column by looking over each line and seeing where the token falls.

2. Convert use of `table.insert` to simply `tokens[#tokens + 1] = ...` for better performance.

3. Implement the `if` statement. This can get a little more complicated depending on your language, ie, if you want to support elseif chains in the same statement without recursion it gets a little unruly to parse. But you could take the simple approach of just parsing an `if` statement, then checking if the next token is `else` and parsing that as a separate block (ie explicit `else "if"` rather than `elseif`).

4. Implement a basic analyzer that checks for undefined variables. This can be done in the parser even, but you should ideally have a separate step for it. You can do this by having a stack of lookup tables storing the variable and whether it exists (and its type, if you are working on a typed language)

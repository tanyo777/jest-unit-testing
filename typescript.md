# TypeScript recap

TypeScript is a super set of javascript which is strongly typed.

# Running TS Code

1. Compile(tsc) TypeScript files and then run in Node or in the Browser.
2. Use ts-node to execute and run TypeScript files directly in Node. (only for dev)
3. Bundle with Webpack and run in the browser (React has built in webpack).

# Type Guards

Validates an input.

```
function isPerson(potentialPerson: any): boolean {
    if('firstname' in potentialPerson && 'lastname' in potentialPerson) {
        return true;
    } else {
        return false;
    }
}
```

# Compiler Options

The way in which the compiler will handle the ts project.
We can pass them as:

```
tsc watch
```

OR

use ts.configs.json and specify typescript options there

```
tsc --init
```

# Access Modifiers

- Public
- Protected (accessible only from child classes)
- Private (accessible only within the class)

# Generics

Additional parameters to functions/interfaces or classes.
Genetics allow us to use function, classes or interfaces with different data types and reuse them.

Example:

This function can be used with any data type.

```
function printVar<T>(param: T) {
  return param;
}
```

# Strict Mode

There are several configuration options for typescript to strictly check our code.
Some of them are:

- noImplicitAny
- noImplicitThis
- strictNullChecks
- strictPropertyInitialization

# Enums

Enums allow a developer to define a set of named constants.TypeScript provides both numeric and string-based enums.
You should always use enums when a variable can only take one out of a small set of possible values.

Example:

```
enum CompanyPositions {
  MANAGER, // 0
  SOFTWARE_ENGINEER, // 1
  JUNIOR_SOFTWARE_ENGINEER, // 2
  SENIOR_SOFTWARE_ENGINEER, // 3
  DEVOPS="DevOps", // DevOps
}
```

# Decorators

They use the decorator pattern to add/extend a classses functionality.Decorators can be attached to classes, methods, properties or parameters.

For example we can use decorator on class property to log every change on the property:

```

// property decorator
function watchChange(target: any, key: string) {
  // target is the class itself
  // key is the name of our property

  const logger = new Logger();

  let property = target[key];

  const getter = () => {
    return property;
  };

  const setter = (newValue: any) => {
    property = newValue;
    logger.addLog({ property: key, newValue: newValue });
  };

  //   modify the getter and setter
  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    configurable: true,
    enumerable: true,
  });
}
```

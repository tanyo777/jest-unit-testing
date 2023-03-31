class Logger {
  logs: object[] = [];

  static instance: Logger;
  constructor() {
    // Singleton pattern
    if (!Logger.instance) {
      Logger.instance = this;
    } else {
      return Logger.instance;
    }
  }

  addLog(message: object) {
    this.logs.push(message);
  }

  getLogs() {
    return this.logs;
  }
}

const anotherObject = {
  testProperty: 'some value',
};

class Manager {
  //   @watchChange // can be used like watchChange(Manager.prototype, "testProperty")
  @shadowProp(anotherObject)
  testProperty!: string;
}

function shadowProp(objectTwo: any) {
  return function (target: any, key: string) {
    let property = target[key];

    const getter = () => {
      return property;
    };

    const setter = (newValue: string) => {
      property = newValue;
      objectTwo[key] = newValue;
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      configurable: true,
      enumerable: true,
    });
  };
}

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

const manager = new Manager();

manager.testProperty = 'test';
manager.testProperty = 'test2';
manager.testProperty = 'test3';
manager.testProperty = 'test4';

// const logger = Logger.instance.getLogs();
console.log(manager.testProperty);
console.log(anotherObject);

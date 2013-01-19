fjs.lib
=======
My attempt to a re-usable JavaScript standard library inspired by the .NET library.

    - A class List inspired by the .NET List<T>
    - A class Dictionary inspired by the .NET Dictionary<K,V>
    - A class Stack inspired by the .NET Stack<T>
    - Extensions method for the class String
    - Extensions method for the class Array
    - The sys singleton, generic methods for every day programming

TORRES Frederic 2011, 2012, 2013

Mit Style License

  ***Dictionary***
===============

    Properties
      Count
      Keys
      Values

    Methods
      add(name, value)
      remove(name)
      clear()
      containsKey(name)
      containsValue(value)
      get(name, defaultValue)
      toString()
      filter(lambda)
      map(lambda)

  ***List***
===============

    Properties
      Count

    Methods
      add()
      addRange()
      all()
      any()
      clear()
      concat()
      contains()
      exists()
      filter()
      findAll()
      findIndex()
      isEmpty()
      map()
      remove()
      removeAll()
      removeAt()
      reverse()
      toString()


  ***String***
===============

    Methods
      capitalize()
      contains()
      endsWith()
      format()
      leftPad()
      leftTrim()
      rightPad()
      rightTrim()
      startsWith()
      trim()

  ***Stack***
===============

    Properties
      count

    Methods
      clear()
      isEmpty()
      peek()
      toString()


  ***Sys***
===============

    Methods
      defaultValue()
      distinct()
      dumpObject()
      extend()
      extendMethods()
      extendProperties()
      getMethods()
      getObjects()
      getRidOfStarComment()
      getType()
      groupBy()
      hasMethod()
      hasValue()
      ifNullOrUndefined()
      ifUndefined()
      Inherit()
      isArray()
      isBoolean()
      isBrowser()
      isDate()
      isDefined()
      isFunction()
      isFunction()
      isInteger()
      isMethod()
      isNodeJs()
      isNull()
      isNullOrUndefined()
      isNumber()
      isNumeric()
      isObject()
      isString()
      isString()
      isTypeDate()
      isUndefined()
      removeMethods()
      traversePath()



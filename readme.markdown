fjs.lib
======
My attempt to a re-usable JavaScript standard library inspired by the .NET library.

    - A class List inspired by the .NET List<T>
    - A class Dictionary inspired by the .NET Dictionary<K,V>
    - A class Stack inspired by the .NET Stack<T>
    - Extensions method for the class String

TORRES Frederic 2011

Mit Style License

  ***Dictionary***
===============

    Properties
      count
      keys
      values

    Methods
      add(name, value)
      remove(name)
      containsKey(name)
      containsValue(value)
      get(name, defaultValue)
      toString()
      filter(lambda)
      map(lambda)

  ***List***
===============

    Properties
      count

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
      getType()
      Inherit()
      defaultValue()
      hasMethod()
      hasValue()
      ifNullOrUndefined()
      ifUndefined()
      isBrowser()
      isDefined()
      isFunction()
      isMethod()
      isNodeJs()
      isNull()
      isNullOrUndefined()
      isString()
      isTypeDate()
      isUndefined()

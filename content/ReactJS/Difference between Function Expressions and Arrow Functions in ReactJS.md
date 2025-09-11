---
title: Difference between Function Expressions and Arrow Functions in ReactJS
tags: [reactjs]
difficulty: medium
date: 2025-09-10
---

## Difference between Function Expressions and Arrow Functions in ReactJS

ReactJS applications are written in JavaScript (or TypeScript), so the differences between **function expressions** and **arrow functions** in ReactJS are rooted in JavaScript itself. However, these differences become especially important when dealing with **components**, **event handlers**, and **state updates**.

---

## ✅ Function Expression

A **function expression** defines a function using the `function` keyword and can have its own `this` context.

```javascript
const MyButton = function(props) {
  return <button>{props.label}</button>;
};
```

### Characteristics:
- Has its own **`this` binding** (depends on how it is called).  
- Can use the `arguments` object.  
- Slightly more verbose syntax.  
- In React, if used as a component, it behaves like a **regular functional component**.  

---

## ✅ Arrow Function

An **arrow function** uses `=>` syntax and does **not** have its own `this`. Instead, it **lexically binds `this`** from the surrounding scope.

```javascript
const MyButton = (props) => {
  return <button>{props.label}</button>;
};
```

### Characteristics:
- **No own `this`** — inherits from the enclosing scope.  
- Cannot use the `arguments` object (use rest parameters instead).  
- More concise syntax, especially good for inline callbacks.  
- Commonly used in React for:
  - **Functional components** (preferred style).
  - **Event handlers**: avoids manually binding `this` in class components.  

---

## 🔑 Key Differences in ReactJS Context

| Aspect                   | Function Expression                               | Arrow Function                                    |
|---------------------------|---------------------------------------------------|--------------------------------------------------|
| **Syntax**                | Uses `function` keyword                          | Uses `=>` arrow syntax                           |
| **`this` binding**        | Dynamic, depends on call site                    | Lexical, inherits from surrounding scope         |
| **Use in class components** | May require `this.method = this.method.bind(this)` | No need to bind, `this` is automatically inherited |
| **Use in functional components** | Works fine                                 | Preferred, more concise and modern                |
| **Arguments object**      | Has its own `arguments`                          | Does not have `arguments`                        |

---

## 📌 Example: Event Handler in Class Component

```javascript
class Counter extends React.Component {
  constructor() {
    super();
    this.state = { count: 0 };

    // Binding needed for function expression
    this.incrementFn = this.incrementFn.bind(this);
  }

  // Function Expression
  incrementFn() {
    this.setState({ count: this.state.count + 1 });
  }

  // Arrow Function (no binding needed)
  incrementArrow = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <button onClick={this.incrementFn}>Function Expression</button>
        <button onClick={this.incrementArrow}>Arrow Function</button>
      </div>
    );
  }
}
```

---

## 👉 Interview Tip

- **Arrow functions** are usually preferred in React for **inline callbacks** and **functional components** because they avoid boilerplate and `this` binding issues.  
- However, **function expressions** (or declarations) are still perfectly valid and sometimes better for **named functions** when debugging stack traces.  


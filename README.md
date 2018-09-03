# re-modulex

一个让 redux 写起来像 vuex 一样简单的轮子

## 安装

```bash
npm install re-modulex --save
```

## 使用方法

全特性 Demo 请参考此处

```javascript
import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { ModuleProvider, connectModules, createModule } from 're-modulex'

const { reducer } = createModule({
  name: 'main',
  state: {
    counter: 0
  },
  actions: ({ commit }) => ({
    add: () => commit('add', 1),
    reduce: () => commit('reduce', 1)
  }),
  mutations: {
    add: (state, amount) => ({
      counter: state.counter + amount
    }),
    reduce: (state, amount) => ({
      counter: state.counter - amount
    })
  }
})

const store = createStore(reducer)

@connectModules(modules => ({
  main: modules.main
}))
class App extends Component {
  render() {
    const { main } = this.props

    return (
      <div>
        当前: {main.state.counter}
        <div>  
          <button onClick={() => main.dispatch.add()}>加1</button>
          <button onClick={() => main.dispatch('reduce')}>减1</button>
        </div>
      </div>
    )
  }
}

render(
  <ModuleProvider store={store}>
    <App />
  </ModuleProvider>,
  document.getElementById('app')
)
```

- - -

## 不想用配套的 ModuleProvider 和 connectModules，想配合 react-redux ？

```javascript

...

import { Provider, connect } from 'react-redux'
import { applyStore, mapModules } from 're-modulex'

...

const store = createStore(reducer)
applyStore(store) // 必须要调用 applyStore，建立 re-modulex 和 store 的连接

...

@connect(state => ({
  else: state.else,

  // 在 mapStateToProps 中使用 mapModules 注入 modules
  // （在 mapDispatchToProps 中也行）
  ...mapModules(modules => ({
    main: modules.main
  }))
}))
class App extends Component {

...

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)

...
```
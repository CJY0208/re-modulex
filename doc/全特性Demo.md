# 特性展览 Demo

## module.js
```javascript
import { createModule } from 're-modulex'

const delay = time => new Promise(resolve => setTimeout(resolve, time))

const reduxModule = createModule({
  name: 'main',
  state: {
    counter: 0,
    text: ''
  },
  actions: ({
    commit, // commit 为原 redux 的 dispatch
    dispatch, // dispatch 只触发到动作层
    getState, // 获取当前 module 的 state
    getReduxState, // 获取整个 redux store 的 state
    getModules // 获取其他 module 以进行模块间通信
  }) => ({
    counter: {
      add: (amount = 1) => commit('add', amount),
      reduce: (amount = 1) => commit('reduce', -1 * amount)
    },
    // 将异步控制从 redux 中拆离，异步操作不依赖其他中间件
    text: async text => {
      await delay(1000)
      commit('text', text)
      await delay(2000)
      commit('add', 1) // 同一个 action 可以 commit 多次
    }
  }),
  mutations: ({ combine }) => ({
    // 变化响应可以合并，类似 redux-actions 的 combineActions
    [combine('add', 'reduce')]: ({ counter }, amount) => ({
      counter: counter + amount
    }),
    text: (state, text) => ({ text })
  }),
  // 允许衍生状态
  getters: {
    text: state => `computed::${state.text}`
  }
})

export default reduxModule
```

- - -

## store.js
```javascript
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import reduxModule from './module.js'

const store = createStore(reduxModule.reducer)

export default store
```

- - -

## app.js
```javascript
import React, { Component } from 'react'
import { connectModules } from 're-modulex'

@connectModules(({ main }) => ({
  main
}))
export default class App extends Component {
  render() {
    const { main } = this.props

    return (
      <div>
        Home
        <div>
          module counter is: {main.state.counter}
          <button onClick={() => main.dispatch.counter.add(2)}>add</button>
          <button onClick={() => main.dispatch('counter/reduce')}>
            reduce
          </button>
        </div>
        
        <input onChange={e => {
          const value = e.target.value
          main.commit('text', value) // 允许直接 commit
        }} />
        <input onChange={e => {
          const value = e.target.value
          main.dispatch('text', value)
        }} />
        <div>main text is: {main.state.text}</div>
        <div>main getters.text is: {main.getters.text}</div>
      </div>
    )
  }
}
```

- - -

## index.js
```javascript
import React from 'react'
import { render } from 'react-dom'
import { ModuleProvider } from 're-modulex'
import App from './app.js'
import store from './store'

render(
  <ModuleProvider {...{ store }}>
    <App />
  </ModuleProvider>,
  document.getElementById('app')
)

```
import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import store from './store'

const renderInRedux = (ui: React.ReactElement) => {
    const Wrapper = ({ children }: any) => {
        return <Provider store={store}>{children}</Provider>
    }
    store.dispatch = jest.fn(store.dispatch) as any

    return { renderResult: render(ui, { wrapper: Wrapper }), store }
}

// override render method
export { renderInRedux }

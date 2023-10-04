import { proxy } from 'valtio'
import { useProxy } from 'valtio/utils'

const store = proxy({ 
    scroll: 0,
})
export const useStore = () => useProxy(store)
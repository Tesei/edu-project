import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGoodsStore } from './goods'
import axios from 'axios'

import flushPromises from 'flush-promises'
import waitForExpect from 'wait-for-expect'

describe('Goods Store', () => {
    beforeEach(() => {
        // создаем новый экземпляр pinia и делаем его активным,
        // чтобы он автоматически подхватывается любым вызовом useStore()
        // без необходимости его передачи: `useStore(pinia)`
        setActivePinia(createPinia())
    })

    afterEach(() => {
        // очищаем моки
        vi.resetAllMocks()
    })

    it('imports without error', () => {
        expect(useGoodsStore).toBeDefined()
        expect(useGoodsStore().defaultGoods).toBeDefined()
        expect(useGoodsStore().fetchGoodsFromFakestore).toBeDefined()
        expect(useGoodsStore().goods).toBeDefined()
        expect(useGoodsStore().goodsList).toBeDefined()
        expect(useGoodsStore().createPost).toBeDefined()
        expect(useGoodsStore().removePost).toBeDefined()
    })

    it('defaultGoods array has items', () => {
        const goodsStore = useGoodsStore()
        expect(goodsStore.defaultGoods).toHaveLength(8)
    })

    it('set default data if fetch has erros', async () => {
        const goodsStore = useGoodsStore()
        axios.get = vi.fn().mockRejectedValue({
            status: 500,
            response: { error: 'error' },
        })
        await goodsStore.fetchGoodsFromFakestore()
        await flushPromises()         
        await waitForExpect(() => {
            expect(goodsStore.goods).toHaveLength(8)
            expect(goodsStore.goods).toEqual(goodsStore.defaultGoods)
        })
    })

    it('check fetchGoodsFromFakestore', async () => {
        const goodsStore = useGoodsStore()
        axios.get = vi.fn().mockResolvedValue({
            status: 200,
            data: goodsStore.defaultGoods,
        })
        await goodsStore.fetchGoodsFromFakestore()
        await flushPromises()         
        await waitForExpect(() => {
            expect(goodsStore.goods).toHaveLength(8)
            expect(goodsStore.goods).toEqual(goodsStore.defaultGoods)
        })
    })
})

import { ref, watchEffect } from 'vue'
import config from "./config.js";

export function useFetch() {
    const data = ref(null)
    const error = ref(null)

    watchEffect(async () => {
        data.value = null
        error.value = null

        try {

            await timeout()

            const res = await fetch(`${config.api.url}categories/`)
            data.value = await res.json()

            console.log('this: ', data.value)
        } catch (e) {
            error.value = e
        }
    })

    return { data, error }
}

// artificial delay
function timeout() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.3) {
                resolve()
            } else {
                reject(new Error('Random Error'))
            }
        }, 300)
    })
}
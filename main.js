const [read, write] = createSignal(1)

setInterval(() => {
    write(read()+1)
}, 1000)

createEffect(() => {
    console.log(`lets read ${read()}`)
})
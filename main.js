const [r, w] = signal(1);

setInterval(() => {
  w(r() + 1);
}, 2000);

const cmp = computed(() => {
  const list = document.createElement("ul");
  for (let i = 0; i < r(); i++) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `i am list item Nr. ${i + 1}`;
    list.appendChild(listItem);
  }
  return list;
});

window.addEventListener("load", function () {
  effect(() => {
    document.body.innerHTML = "";
    document.body.appendChild(cmp[0]());
    console.log(`cmp value is ${cmp[0]()}`);
  });
});

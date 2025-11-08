const LS_KEY = "mini_crud_items"

function load() {
  const raw = localStorage.getItem(LS_KEY)
  return raw ? JSON.parse(raw) : []
}

function save(items) {
  localStorage.setItem(LS_KEY, JSON.stringify(items))
}

function currency(v) {
  return Number(v).toFixed(2)
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

function render(rows) {
  const tbody = document.getElementById("tbody")
  tbody.innerHTML = ""
  let grand = 0
  rows.forEach(r => {
    const tr = document.createElement("tr")
    const total = Number(r.price) * Number(r.qty)
    grand += total
    tr.innerHTML = `
      <td>${r.name}</td>
      <td>${currency(r.price)}</td>
      <td>${r.qty}</td>
      <td>${currency(total)}</td>
      <td>
        <button class="action-btn" data-action="edit" data-id="${r.id}">Modifier</button>
        <button class="action-btn alt" data-action="delete" data-id="${r.id}">Supprimer</button>
      </td>
    `
    tbody.appendChild(tr)
  })
  document.getElementById("grand-total").textContent = currency(grand)
}

function resetForm() {
  document.getElementById("id").value = ""
  document.getElementById("name").value = ""
  document.getElementById("price").value = ""
  document.getElementById("qty").value = ""
  document.getElementById("save-btn").textContent = "Ajouter"
}

function currentFiltered(items) {
  const q = document.getElementById("search").value.trim().toLowerCase()
  if (!q) return items
  return items.filter(r =>
    r.name.toLowerCase().includes(q)
    || String(r.price).includes(q)
    || String(r.qty).includes(q)
  )
}

function init() {
  let items = load()
  render(currentFiltered(items))

  document.getElementById("product-form").addEventListener("submit", e => {
    e.preventDefault()
    const id = document.getElementById("id").value
    const name = document.getElementById("name").value.trim()
    const price = document.getElementById("price").value
    const qty = document.getElementById("qty").value
    if (!name) return
    if (id) {
      items = items.map(it => it.id === id ? { ...it, name, price: Number(price), qty: Number(qty) } : it)
    } else {
      items.push({ id: uid(), name, price: Number(price), qty: Number(qty) })
    }
    save(items)
    render(currentFiltered(items))
    resetForm()
  })

  document.getElementById("reset-btn").addEventListener("click", () => {
    resetForm()
  })

  document.getElementById("tbody").addEventListener("click", e => {
    const btn = e.target.closest("button")
    if (!btn) return
    const id = btn.getAttribute("data-id")
    const action = btn.getAttribute("data-action")
    if (action === "edit") {
      const it = items.find(x => x.id === id)
      if (!it) return
      document.getElementById("id").value = it.id
      document.getElementById("name").value = it.name
      document.getElementById("price").value = it.price
      document.getElementById("qty").value = it.qty
      document.getElementById("save-btn").textContent = "Mettre à jour"
      window.scrollTo(0, 0)
    }
    if (action === "delete") {
      items = items.filter(x => x.id !== id)
      save(items)
      render(currentFiltered(items))
    }
  })

  document.getElementById("search").addEventListener("input", () => {
    render(currentFiltered(items))
  })

  document.getElementById("clear-all").addEventListener("click", () => {
    items = []
    save(items)
    render(items)
    resetForm()
    document.getElementById("search").value = ""
  })
}

document.addEventListener("DOMContentLoaded", init)

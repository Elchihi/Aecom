export function addToCart(cart, product) {
  const existing = cart.find(i => i.id === product.id)
  if (existing) {
    return cart.map(i => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
  }
  return [...cart, { id: product.id, title: product.title, price: product.price, image: product.image, qty: 1 }]
}

export function removeFromCart(cart, id) {
  return cart.filter(i => i.id !== id)
}

export function changeQty(cart, id, qty) {
  if (qty <= 0) return cart.filter(i => i.id !== id)
  return cart.map(i => (i.id === id ? { ...i, qty } : i))
}

export function cartTotal(cart) {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0)
}

export function cartCount(cart) {
  return cart.reduce((sum, i) => sum + i.qty, 0)
}

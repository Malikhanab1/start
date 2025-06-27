function rw(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

function generateBusinessName() {
  const adjectives = ["Quick", "Happy", "Crazy", "Silent", "Bold"];
  const shopNames = ["Cafe", "Bakery", "Studio", "Store", "Boutique"];
  const extraWords = ["Express", "World", "Corner", "Vibe", "Empire"];

  const adj = rw(adjectives);
  const shop = rw(shopNames);
  const extra = rw(extraWords);

  return `${adj} ${shop} ${extra}`;
}



/* eslint-disable no-undef */
const fs = require("fs").promises;
const path = require("path");

async function getStoredItems() {
  
  const filePath = path.join(__dirname, "..", "items.json");
  
  try {
    const rawFileContent = await fs.readFile(filePath, { encoding: "utf-8" });
    const data = JSON.parse(rawFileContent);
    const storedItems = data.items ?? [];
    return storedItems;
  } catch (error) {
    console.error("Error reading items.json:", error);
    return []; 
  }
}

async function storeItems(items) {
  try {
    await fs.writeFile(
      path.join(__dirname, "..", "items.json"), 
      JSON.stringify({ items: items || [] })
    );
    console.log("Items stored successfully.");
  } catch (error) {
    console.error("Error writing items.json:", error);
  }
}

exports.getStoredItems = getStoredItems;
exports.storeItems = storeItems;

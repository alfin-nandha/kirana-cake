const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, 'src', 'data', 'products.json');
const imagesDirPath = path.join(__dirname, 'public', 'products');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
const images = fs.readdirSync(imagesDirPath).filter(file => file.endsWith('.jpeg'));

function normalizeString(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

products.forEach(product => {
    product.images = [];
    product.variants = ["Original"]; // Default variant

    // Find matching images based on normalized names
    const productNameNorm = normalizeString(product.name);

    // Some manual matching logic based on the names given
    const matchingImages = images.filter(img => {
        const imgNameNorm = normalizeString(img.replace('.jpeg', '').replace(/\d+$/, '')); // remove extension and trailing number

        // Exact match or contains
        return imgNameNorm.includes(productNameNorm) || productNameNorm.includes(imgNameNorm);
    });

    if (matchingImages.length > 0) {
        // Sort images so 1 comes before 2, etc.
        matchingImages.sort();
        product.images = matchingImages.map(img => `/products/${img}`);
    } else {
        // Fallback for tricky names, maybe manual mapping is better for some, let's see which ones miss
        console.log(`Warning: No images found for ${product.name}`);
    }

    delete product.emoji;
});

// We'll write it out for now, and fix it manually if there are any misses.
fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 4));
console.log('Successfully updated products.json');

// console logging misses to know what to fix
const misses = products.filter(p => p.images.length === 0);
if (misses.length > 0) {
    console.log("Misses:");
    misses.forEach(m => console.log(m.name, m.id));
}

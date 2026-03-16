const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'products');
const productsFile = path.join(__dirname, 'src', 'data', 'products.json');

const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));

// 1. Rename files in public/products
const files = fs.readdirSync(publicDir);
const renameMap = {}; // old -> new

files.forEach(file => {
    if (file.includes('%')) {
        const newName = file.replace(/%/g, 'percent');
        const oldPath = path.join(publicDir, file);
        const newPath = path.join(publicDir, newName);
        fs.renameSync(oldPath, newPath);
        renameMap[file] = newName;
        console.log(`Renamed: "${file}" -> "${newName}"`);
    } else if (file.includes('(') || file.includes(')') || file.includes(' ')) {
        // Clean up other potentially problematic characters for Next.js Image component
        const newName = file.replace(/[\(\)]/g, '').replace(/\s+/g, '-');
        if (newName !== file) {
            const oldPath = path.join(publicDir, file);
            const newPath = path.join(publicDir, newName);
            fs.renameSync(oldPath, newPath);
            renameMap[file] = newName;
            console.log(`Renamed: "${file}" -> "${newName}"`);
        }
    }
});

// 2. Update products.json
let updatedCount = 0;
products.forEach(product => {
    if (product.images && product.images.length > 0) {
        product.images = product.images.map(img => {
            const fileName = path.basename(img);
            if (renameMap[fileName]) {
                // Get original extension and path logic in case we need to reconstruct
                updatedCount++;
                return `/products/${renameMap[fileName]}`;
            }
            return img;
        });
    }
});

if (updatedCount > 0) {
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 4));
    console.log(`Updated products.json with ${updatedCount} altered image paths.`);
} else {
    console.log("No paths needed updating in products.json.");
}

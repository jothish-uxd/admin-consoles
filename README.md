# Admin Consoles

A personal pattern library of admin console UIs — like Mobbin, but just for me and just for admin work. Screens are grouped by the job the admin is doing (adding users, deleting things, setting policy) rather than by product.

Static site, no build step. Open `index.html` or serve the folder.

## Structure

```
index.html            Home: all categories, search (/ to focus), group filters
category.html?c=slug  One category: patterns to collect + saved screens
data/categories.js    Groups, categories, patterns and screen entries
assets/               Styles, app script, monochrome wireframe thumbnails
screens/<slug>/       Screenshot images, one folder per category
```

## Adding a screenshot

1. Put the image in `screens/<category-slug>/`.
2. Add an entry to that category's `screens` array in `data/categories.js`:

```js
{
  src: "screens/user-management/okta-add-person.png",
  product: "Okta",
  title: "Add person modal",
  pattern: "Invite / add user",   // match one of the category's patterns
  notes: "Activation choice lives inline.",
  source: "https://..."           // optional
}
```

Counts on the home page and sidebar update automatically.

## Publishing

Settings → Pages → Deploy from branch → `main` / root.

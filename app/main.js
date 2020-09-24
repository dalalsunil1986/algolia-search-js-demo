const search = instantsearch({
    appId: "PYLFFE3Q8H",
    apiKey: "bb61b22e4f51d14172584867a4befec2",
    indexName: "products_index",
    searchParameters: {
        hitsPerPage: 5,
        attributesToSnippet: ["description:24"],
        snippetEllipsisText: " [...]"
    }
});


// search input
search.addWidget(
    instantsearch.widgets.searchBox({
        container: "#searchbox",
        placeholder: "Search for products",
        autofocus: false
    })
);

// result
search.addWidget(
    instantsearch.widgets.hits({
        container: "#hits",
        templates: {
            empty: "No results.",
            item: function (hit) {
                return `<div class="hit">
                <div class="hit-image">
                    <img src="${hit.image}" />
                </div>
                <div class="hit-content">
                    
                    <div>
                        <div class="hit-name">${hit._highlightResult.title.value}</div>
                        <div class="hit-description">${
                            hit._snippetResult.description.value
                        }</div>
                    </div>
                    
                    <div class="hit-price">₹${hit.price}</div>

                    <div>Rating: ${hit.rating}</div>
                    <div>Sold by ${hit.seller}</div>
                </div>
              </div>`;
            }
        }
    })
);

// categories filter
search.addWidget(
    instantsearch.widgets.refinementList({
        container: '#categories',
        attributeName: 'category',
    })
)

// pagination
search.addWidget(
    instantsearch.widgets.pagination({
        container: "#pagination"
    })
);

// stats
search.addWidget(
    instantsearch.widgets.stats({
        container: "#stats",
        templates: {
            body(hit) {
                return `<span role="img" aria-label="emoji">⚡️</span> <strong>${hit.nbHits}</strong> results found ${
            hit.query != "" ? `for <strong>"${hit.query}"</strong>` : ``
          } in <strong>${hit.processingTimeMS}ms</strong>`;
            }
        }
    })
);


search.start();
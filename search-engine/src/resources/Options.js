const options = {
    model: [
        { label: 'PAGE RANK', value: 'pagerank' },
        { label: 'HITS', value: 'hits' },
    ],

    cluster: [
        { label: 'FLAT', value: 'flat' },
        { label: 'HIERARCHICAL', value: 'hierarchical' },
    ],

    expansion: [
        { label: 'ASSOCIATION', value: 'association_qe' },
        { label: 'METRIC', value: 'metric_qe' },
        { label: 'SCALAR', value: 'scalar_qe' },
    ],
    engines: [
        { label: 'ALMIGHTY', value: 'almighty' },
        { label: 'GOOGLE', value: 'google' },
        { label: 'BING', value: 'bing' },
    ]
}

export default options
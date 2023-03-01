const options = {
    model: [
        { label: 'PAGE RANK', value: 'pagerank' },
        { label: 'HITS', value: 'hits' },
    ],

    cluster: [
        { label: 'NONE', value: 'none' },
        { label: 'FLAT', value: 'flat' },
        { label: 'HIERARCHICAL', value: 'heirarchy' },
    ],

    expansion: [
        { label: 'NONE', value: 'none' },
        { label: 'ASSOCIATION', value: 'association' },
        { label: 'METRIC', value: 'metric' },
        { label: 'SCALAR', value: 'scalar' },
    ]
}

export default options
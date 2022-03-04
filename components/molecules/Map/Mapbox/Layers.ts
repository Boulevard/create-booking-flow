import { LayerProps } from 'react-map-gl/src/components/layer'

export const clusterLayer = {
    id: 'clusters',
    type: 'circle',
    source: 'stores',
    paint: {
        'circle-color': [
            'step',
            ['number', ['get', 'point_count'], 1],
            '#333333',
            100,
            '#333333',
        ],
        'circle-radius': [
            'step',
            ['number', ['get', 'point_count'], 1],
            20,
            10,
            20,
        ],
    },
} as LayerProps

export const clusterLayerShadow = {
    id: 'clustersShadow',
    type: 'circle',
    source: 'stores',
    paint: {
        'circle-radius': [
            'step',
            ['number', ['get', 'point_count'], 1],
            24,
            20,
            24,
        ],
        'circle-color': '#999',
        'circle-opacity': 0.7,
    },
} as LayerProps

export const clusterCountLayer = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'stores',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['Heebo ExtraBold'],
        'text-size': 12,
    },
    paint: {
        'text-color': '#ffffff',
    },
} as any as LayerProps

export const unclusterCountLayer = {
    id: 'uncluster-count',
    type: 'symbol',
    source: 'stores',
    filter: ['!', ['has', 'point_count']],
    layout: {
        'text-field': '1',
        'text-font': ['Heebo ExtraBold'],
        'text-size': 12,
    },
    paint: {
        'text-color': '#ffffff',
    },
} as any as LayerProps

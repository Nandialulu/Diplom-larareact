import Map from '@/Components/Map';

export default function MapPage({ markers }) {
    return (
        <div>
            <h1>My Web Map</h1>
            <Map markers={markers} />
        </div>
    );
}
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'
import { useRef } from "react"

const LIBRARIES = ["places"];

export default function BecomeHost() {
  const locationEnter = useRef(null);

  const { isLoaded } = useJsApiLoader({
    // id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES
  });
  const { data, setData, post, processing, errors } = useForm({
    phone: '',
    location: '', 
  });

  // gazr songohod ajilah function
  const handlePlacesChanged = () => {
    const places = locationEnter.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      
      setData({
        ...data,
        location: place.formatted_address || place.name,
      });
    }
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('host.store'));
  };

  return (
    <GuestLayout>
      <Head title="Become a Host" />

      <form onSubmit={submit} className="max-w-md mx-auto p-6">
        <div>
          <InputLabel value="Утас" />
          <TextInput
            className="w-full"
            value={data.phone}
            onChange={e => setData('phone', e.target.value)}
          />
          <InputError message={errors.phone} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel value="Байршил" />
          
          {isLoaded ? (
            <StandaloneSearchBox
              onLoad={(ref) => (locationEnter.current = ref)}
              onPlacesChanged={handlePlacesChanged}
            >
              <TextInput
                className="w-full"
                placeholder="Байршил хайх..."
                value={data.location}
                // hereglegch garaar biched state-iig shinechileh
                onChange={e => setData('location', e.target.value)}
              />
            </StandaloneSearchBox>
          ) : (
            <TextInput disabled className="w-full" placeholder="Loading maps..." />
          )}
          
          <InputError message={errors.location} className="mt-2" />
        </div>

        <PrimaryButton className="mt-6 w-full justify-center" disabled={processing}>
          Түрээслүүлэгч болох
        </PrimaryButton>
      </form>
    </GuestLayout>
  );
}
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function BecomeHost() {
  const { data, setData, post, processing, errors } = useForm({
    phone: '',
    location: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('host.store'));
  };

  return (
    <GuestLayout>
      <Head title="Become a Host" />

      <form onSubmit={submit}>
        <div>
          <InputLabel value="Утас" />
          <TextInput
            value={data.phone}
            onChange={e => setData('phone', e.target.value)}
          />
        </div>

        <div className="mt-4">
          <InputLabel value="Байршил" />
          <TextInput
            value={data.location}
            onChange={e => setData('location', e.target.value)}
          />
        </div>

        <PrimaryButton className="mt-4" disabled={processing}>
          Түрээслэгч болох
        </PrimaryButton>
      </form>
    </GuestLayout>
  );
}

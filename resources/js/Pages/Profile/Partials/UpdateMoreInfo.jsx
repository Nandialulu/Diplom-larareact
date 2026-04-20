import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';

export default function UpdateMoreInfo({
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            bio: user.bio || '',
            language: user.language || '',
            job: user.job || '',
        });
    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.UpdateMoreInfo'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Бусад мэдээлэл шинэчлэх
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Өөрийн профайл мэдээллээ шинэчилнэ.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">

                {/* BIO */}
                <div>
                    <InputLabel htmlFor="bio" value="Танилцуулга" />

                    <textarea
                        id="bio"
                        value={data.bio}
                        onChange={(e) => setData('bio', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        rows={4}
                        placeholder="Өөрийн тухай товч бичнэ үү"
                    />

                    <InputError className="mt-2" message={errors.bio} />
                </div>

                {/* LANGUAGE */}
                <div>
                    <InputLabel htmlFor="language" value="Хэл" />

                    <TextInput
                        id="language"
                        className="mt-1 block w-full"
                        value={data.language}
                        onChange={(e) => setData('language', e.target.value)}
                        placeholder="Жишээ: Монгол, Англи"
                    />

                    <InputError className="mt-2" message={errors.language} />
                </div>

                {/* JOB */}
                <div>
                    <InputLabel htmlFor="job" value="Мэргэжил / Ажил" />

                    <TextInput
                        id="job"
                        className="mt-1 block w-full"
                        value={data.job}
                        onChange={(e) => setData('job', e.target.value)}
                        placeholder="Жишээ: Developer"
                    />

                    <InputError className="mt-2" message={errors.job} />
                </div>

                {/* BUTTON */}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        Хадгалах
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in-out"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600">
                            Амжилттай хадгалагдлаа!
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
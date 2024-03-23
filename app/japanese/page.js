'use client'
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getAudio, getTranslation, deleteAllAudios } from '@/api/japanese/requests';
import { Input } from '@/components/ui/input';
import { CopySlash, DownloadIcon, Trash2 } from 'lucide-react';
import { toast } from "sonner"
import { Button } from '@/components/ui/button';
const Japanese = () => {
  const [word, setWord] = useState('');
  const [debouncedWord, setDebouncedWord] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedWord(word);
    }, 500);

    return () => clearTimeout(timer);
  }, [word]);
  const { data: translate, error, status } = useQuery({
    queryKey: ['translate', debouncedWord],
    queryFn: () => getTranslation(debouncedWord),
    enabled: !!word,
  });

  const { data: audioData, isLoading: isAudioLoading, refetch } = useQuery({
    queryKey: ['audio'],
    queryFn: () => getAudio(word),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: false,
  });

  const { mutate: deleteAllAudio } = useMutation({
    mutationFn: deleteAllAudios,
    onSuccess: () => {
      audioData.data.index = 0;
    },
  })

  const handleWordChange = (e) => {
    setWord(e.target.value);
  };

  return (
    <main className="wrapper">
      <section className="flex flex-col space-y-4">

        <section className='flex gap-2'>
          <Input type="text" value={word} onChange={handleWordChange} placeholder="Введите японское слово" />
          {console.log(audioData)}
          <Button onClick={deleteAllAudio} size="icon" variant="outline"><Trash2 size="16" /> {audioData ? audioData.data.index : null}</Button>
        </section>

        {status === 'pending' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
          <div className="flex justify-between items-center gap-2">
            <div className='space-y-2'>
              {['en', 'ru'].map((lang, index) => (
                translate.data.translation[lang] && (
                  <div key={index} className="flex gap-2 flex-row items-center">
                    <img className="twemoji" src={`https://www.japandict.com/images/flags/1f1${lang === 'en' ? 'ec-1f1e7' : 'f7-1f1fa'}.svg`} width="30" height="30" />
                    <p>{translate.data.translation[lang]}</p>
                  </div>
                )
              ))}
            </div>


            <Button onClick={refetch} variant="outline" size="icon" className="shrink-0">
              <DownloadIcon size={16} />
            </Button>

          </div>
        )}
      </section>
    </main>
  );
};

export default Japanese;
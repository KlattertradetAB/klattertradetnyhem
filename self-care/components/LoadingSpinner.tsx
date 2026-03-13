import { useTranslations } from '../translations';
import Loader from '../../components/ui/Loader';

const LoadingSpinner: React.FC = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="flex items-center justify-center mb-4">
        <Loader />
      </div>
      <p className="text-brand-primary dark:text-brand-accent font-semibold mt-6 text-lg">{t.loadingAnalysis}</p>
      <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">{t.loadingTakeAMoment}</p>
    </div>
  );
};

export default LoadingSpinner;
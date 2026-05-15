import { Navigate, useParams } from "react-router-dom";
import { surveys } from "@/surveys/registry";
import SurveyRunner from "@/components/ui/SurveyRunner";

function SurveyPage() {
  const { id } = useParams<{ id: string }>();
  const survey = id ? surveys[id] : undefined;

  if (!survey) return <Navigate to="/" replace />;

  return <SurveyRunner key={survey.id} survey={survey} />;
}

export default SurveyPage;

import { useParams } from "react-router-dom";

export default function DashboardTask() {
  const { slug } = useParams();
  console.log(slug);

  return <div>tasks: {slug}</div>;
}

import VideoHeader from "./VideoHeader";
import VideoPlayer from "./VideoPlayer";
import VideoControls from "./VideoControls";
import VideoProgress from "./VideoProgress";
import VideoNavigation from "./VideoNavigation";
import LessonInfo from "./LessonInfo";
import NotesCard from "./NotesCard";
import QuestionsCard from "./QuestionsCard";
import VideoSidebar from "./VideoSidebar";

export default function VideoPlayerPage() {
  return (
    <div className="space-y-8">
      <VideoHeader />

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <VideoPlayer />

          <VideoControls />

          <VideoProgress />

          <VideoNavigation />

          <LessonInfo />

          <NotesCard />

          <QuestionsCard />
        </div>

        <VideoSidebar />
      </div>
    </div>
  );
}
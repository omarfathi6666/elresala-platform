import CourseNode from "./CourseNode";

export default function ContentTree() {
  return (
    <div className="space-y-6">

      <CourseNode
        title="الأحياء"
      />

      <CourseNode
        title="العلوم المتكاملة"
      />

    </div>
  );
}
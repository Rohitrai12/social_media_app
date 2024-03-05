import FeedbackForm from "@/components/forms/FeedbackForm";

const Feedback = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">

        <FeedbackForm action="Create" />
      </div>
    </div>
  );
};

export default Feedback;

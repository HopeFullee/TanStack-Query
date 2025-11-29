interface Props {
  title: string;
}

const TodoCard = ({ title }: Props) => {
  return (
    <div className="min-w-50 min-h-50 border flex justify-center items-center text-center">
      {title}
    </div>
  );
};

export default TodoCard;

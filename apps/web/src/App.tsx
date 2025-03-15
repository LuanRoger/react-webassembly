import { add } from "@repo/webassembly/debug";
import { useState } from "react";
import { BinaryOperationSchema, binaryOperationSchema } from "./utils/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function App() {
  const [result, setReslt] = useState(0);
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(binaryOperationSchema),
    defaultValues: {
      num1: 0,
      num2: 0,
    },
  });

  function handleClick(data: BinaryOperationSchema) {
    const { num1, num2 } = data;

    const newResult = add(num1, num2);
    setReslt(newResult);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(handleClick)}
        className="flex flex-col gap-4"
      >
        <label className="input">
          <span className="label">Number 1</span>
          <input type="number" {...register("num1", { required: true })} />
        </label>
        <label className="input">
          <span className="label">Number 2</span>
          <input type="number" {...register("num2", { required: true })} />
        </label>
        <button type="submit" className="btn">
          Add
        </button>
      </form>
      <p className="text-lg font-bold mt-4">Result: {result}</p>
    </div>
  );
}

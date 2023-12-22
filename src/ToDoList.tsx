import { useState } from "react";
import { useForm } from "react-hook-form";

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDoError("");
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    console.log("submit");
    setToDo("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write a to do!" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
} */

interface IForm {
  email: string;
  firstName: string;
  lastName?: string;
  userName: string;
  password: string;
  password2: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: any) => {
    console.log(data);
  };
  // register함수는 onBlur 이벤트, onChange 이벤트, ref, name을 가짐
  // watch함수는 form의 입력값들의 변화를 관찰함
  // handleSubmit은 validation을 담당함
  // formState.errors는 에러를 발생시킴

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message as ""}</span>
        <input
          {...register("firstName", { required: "write here" })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message as ""}</span>
        <input
          {...register("lastName", { required: "write here" })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message as ""}</span>
        <input
          {...register("userName", {
            required: "Your user name is too short",
            minLength: 10,
          })}
          placeholder="User Name"
        />
        <span>{errors?.userName?.message as ""}</span>
        <input
          {...register("password", {
            required: "Your password is too short",
            minLength: 5,
          })}
          placeholder="Password"
        />
        <span>{errors?.password?.message as ""}</span>
        <input
          {...register("password2", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password is too short",
            },
          })}
          placeholder="Password2"
        />
        <span>{errors?.password2?.message as ""}</span>
        <button>Add</button>
      </form>
    </div>
  );
}
export default ToDoList;

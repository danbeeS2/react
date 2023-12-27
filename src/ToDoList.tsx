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
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.password2) {
      setError(
        "password2",
        { message: "Password are not the same" },
        { shouldFocus: true } // shouldFocus는 에러가 발생하면 커서를 해당 input에 focus시켜줌
      );
    }
    // setError("extraError", { message: "Server offline" });
  };
  console.log(errors);
  // register함수는 onBlur 이벤트, onChange 이벤트, ref, name을 가짐
  // watch함수는 form의 입력값들의 변화를 관찰함
  // handleSubmit은 validation을 담당함
  // formState.errors는 에러를 발생시킴
  // setError는 발생하는 문제에 따라 추가적으로 에러를 설정할 수 있게 도와줌

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
          {...register("lastName", {
            required: "write here",
            validate: {
              noNico: (value) =>
                value?.includes("nico") ? "No nicos allowed" : true,
              // validate: (nico를 포함하지 않는다면 true 반환) validate를 통과하지 못해서 발생하는 에러
              noNick: (value) =>
                value?.includes("nick") ? "No nick allowed" : true,
            },
          })}
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
        <span>{errors?.extraError?.message as ""}</span>
      </form>
    </div>
  );
}
export default ToDoList;

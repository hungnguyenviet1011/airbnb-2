'use client'

import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modals";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { FcGoogle } from 'react-icons/fc'
import toast from "react-hot-toast";
import Button from "../Button";
import { AiFillGithub } from "react-icons/ai";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios.post('/api/register', data)
      .then(() => {
        registerModal.onClose()
      }).catch((error) => {
        toast.error('Something went wrong')
      }).finally(() => {
        setIsLoading(false)
      });
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Airbnb"
        subtitle="Create an account"
      />
      <Input
        id="email"
        label="email"
        disabled={isLoading}
        register={register}
        erorrs={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        erorrs={errors}
        required
      />
      <Input
        id="password"
        label="password"
        type="Password"
        disabled={isLoading}
        register={register}
        erorrs={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => { }}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => { }}
      />
      <div className="text-neutral-500 text-center mr-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>
            Already have an account?
          </div>
          <div
            onClick={registerModal.onClose}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      body={bodyContent}
      footer={footerContent}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

export default RegisterModal;
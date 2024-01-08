'use client'

import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modals";
import Heading from "../Heading";

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
        console.log(error)
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
    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

export default RegisterModal;
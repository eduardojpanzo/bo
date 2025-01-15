"use client";

import { InputWithControl } from "@/components/form/input-control";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { ResponsiveGrid } from "@/components/responsive-grid";
import { useEffect, useState } from "react";
import { useDialog } from "@/contexts/dialog-context";
import { gettingData, settingData } from "@/lib/fecth";
import { TaskModel } from "@/models/task.model";
import { TextareaWithControl } from "../form/textarea-control";
import { AutoCompleteControl } from "../form/select-component/autocomplete-control";
import { CategoryModel } from "@/models/category.model";

const formSchema = z.object({
  title: z.string({ message: "Por favor insira o titulo" }).min(4, {
    message: "O titulo da tarefa deve ter pelo menos 4 caracteres",
  }),
  description: z.string().min(10, {
    message: "O descricão deve ser mais que 10 caracteres",
  }),
  dueDate: z.string({ message: "Por favor insira uma data" }).datetime({
    message: "Por favor insira uma data",
    offset: true,
    local: true,
  }),
  statusId: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { message: "Por favor insira um status" }
  ),
  categoryId: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { message: "Por favor insira uma categoria" }
  ),
  // userId: z.object(
  //   {
  //     label: z.string(),
  //     value: z.string(),
  //   },
  //   { message: "Por favor insira um usuario" }
  // ),
});

type FormShemaType = z.infer<typeof formSchema>;

export function FormTask({ id }: { id?: string }) {
  const { close, form, onSubmit } = useFromAction(id);
  console.log(form.watch("dueDate"));

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {id ? "Editar Tarefa" : "Criar uma nova tarefa"}
        </DialogTitle>
        <DialogDescription>Defina os dados da tarefa</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="formTask">
          <ResponsiveGrid>
            <InputWithControl
              label="Título"
              control={form.control}
              name="title"
            />

            <InputWithControl
              label="Data Limite"
              control={form.control}
              name="dueDate"
              type="datetime-local"
            />

            <AutoCompleteControl
              label="Categoria"
              control={form.control}
              name="categoryId"
              path={CategoryModel.ENDPOINT}
              propertyLabel="name"
              propertyValue="id"
            />
            <AutoCompleteControl
              label="Status"
              control={form.control}
              name="statusId"
              path="/status"
              propertyLabel="name"
              propertyValue="id"
            />
          </ResponsiveGrid>
          <TextareaWithControl
            label="Descrição"
            control={form.control}
            name="description"
          />
        </form>
      </Form>
      <DialogFooter>
        <Button
          variant={"ghost"}
          onClick={() => {
            close();
          }}
        >
          Cancelar
        </Button>
        <Button
          disabled={
            !form.formState.isValid ||
            !form.formState.isDirty ||
            form.formState.isSubmitting
          }
          form="formTask"
          type="submit"
        >
          Salvar
        </Button>
      </DialogFooter>
    </>
  );
}

function useFromAction(id?: string) {
  const { close, closeAndEmit } = useDialog();
  const [isLoading, setIsLoading] = useState(true);
  const form = useForm<FormShemaType>({
    resolver: zodResolver(formSchema),
    mode: "all",
  });

  const loadData = async () => {
    try {
      const data = await gettingData<TaskModel>(`${TaskModel.ENDPOINT}/${id}`);

      // form.reset({
      //   nome: data.nome,
      //   descricao: data.descricao,
      // } as TaskModel);
      console.log(data);

      setIsLoading(false);
    } catch {}
  };

  const onSubmit = async (values: FormShemaType) => {
    try {
      let path = `${TaskModel.ENDPOINT}`;

      if (id) path = `${path}/${id}`;

      await settingData(
        path,
        JSON.stringify({
          ...values,
          ...(id ? { id } : {}),
        }),
        id ? "put" : "post"
      );

      closeAndEmit({
        title: `${id ? "Atualizado" : "Salvo"} com sucesso`,
        variant: "default",
      });
    } catch {}
  };

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);
  return { form, isLoading, onSubmit, close };
}

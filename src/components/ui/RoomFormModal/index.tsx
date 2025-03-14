import { Dialog } from "radix-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  Form,
  Input,
  InputContainer,
  InputLabel,
  SubmitButton,
} from "./styles";
import { getUser } from "../../../http/get-user";
import { showToast } from "../Toast";
import { client } from "../../../database/client";

const createRoomSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
});

type CreateRoomForm = z.infer<typeof createRoomSchema>;

interface NewRoomModalProps {
  children: React.ReactNode;
}

export function NewRoomModal({ children }: NewRoomModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRoomForm>({
    resolver: zodResolver(createRoomSchema),
  });

  const onSubmit = async (data: CreateRoomForm) => {
    try {
      setIsLoading(true);

      const userData = await getUser();

      if (!userData) {
        showToast({
          message: "Você precisa estar logado para criar uma sala",
          type: "error",
          position: "bottom-right",
        });
        return;
      }

      const sanitizedUser = {
        id: typeof userData.id === "object" ? userData.id : userData.id,
        name: userData.name,
        avatar: userData.avatar,
        email: userData.email,
        created_at: userData.created_at,
      };

      const userId = sanitizedUser.id;

      const { data: roomData, error } = await client
        .from("rooms")
        .insert({
          name: data.name,
          user_id: userId,
          stage: "WAITING",
          created_at: new Date().toISOString(),
          users: [sanitizedUser],
        })
        .select();

      if (error) {
        throw error;
      }

      if (roomData && roomData[0]?.id) {
        // navigate to the new room
        navigate(`/rooms/${roomData[0].id}`);
      }
    } catch (error) {
      console.error("Erro ao criar sala:", error);
      showToast({
        message: "Erro ao criar sala. Tente novamente.",
        type: "error",
        position: "bottom-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar nova sala</DialogTitle>
            <DialogClose>
              <X size={18} />
            </DialogClose>
          </DialogHeader>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
              <InputLabel>Nome da sala</InputLabel>
              <Input
                type="text"
                placeholder="Digite um nome para a sala"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-danger small">{errors.name.message}</span>
              )}
            </InputContainer>

            <DialogFooter>
              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? "Criando..." : "Criar sala"}
              </SubmitButton>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

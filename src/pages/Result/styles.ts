import { EditorContent } from "@tiptap/react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  width: 100%;
  box-sizing: border-box;
`;

export const CardContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1.5rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const CardHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

export const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const CardContent = styled.div``

export const Editor = styled(EditorContent)`
  height: 50vh;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  padding: 0.5rem;

  .ProseMirror {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }
`;


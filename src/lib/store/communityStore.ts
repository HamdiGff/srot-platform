import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  MOCK_COMMUNITY_QUESTIONS,
  CommunityQuestion,
  CommunityAnswer,
  CommunitySector,
} from "@/data/mockCommunity";

export interface NewQuestionInput {
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  sector: CommunitySector;
  cropOrAnimal: string;
  cropOrAnimalEn?: string;
  authorName: string;
  authorLocation: string;
  authorLocationEn?: string;
  authorAvatar: string;
  authorRole: "farmer" | "dairy_farmer" | "poultry_farmer" | "fish_farmer" | "pet_owner";
  images?: string[];
}

export interface NewAnswerInput {
  authorId: string;
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  isVerifiedExpert: boolean;
  registrationBadge?: string;
  content: string;
  contentEn?: string;
  clinicalAction?: string;
}

interface CommunityState {
  questions: CommunityQuestion[];

  // Questions
  addQuestion: (input: NewQuestionInput) => CommunityQuestion;
  updateQuestion: (id: string, updates: Partial<CommunityQuestion>) => void;
  deleteQuestion: (id: string) => void;
  upvoteQuestion: (id: string) => void;

  // Answers
  addAnswer: (questionId: string, input: NewAnswerInput) => void;
  updateAnswer: (questionId: string, answerId: string, newContent: string) => void;
  deleteAnswer: (questionId: string, answerId: string) => void;
  acceptAnswer: (questionId: string, answerId: string) => void;
  upvoteAnswer: (questionId: string, answerId: string) => void;

  // Getters
  getQuestionById: (id: string) => CommunityQuestion | undefined;
  getQuestionsByAuthor: (authorName: string) => CommunityQuestion[];
  getQuestionsBySector: (sector: CommunitySector | "all") => CommunityQuestion[];
  resetToDefaults: () => void;
}

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set, get) => ({
      questions: MOCK_COMMUNITY_QUESTIONS,

      addQuestion: (input) => {
        const newId = `q-${Date.now().toString(36)}`;
        const now = new Date();
        const dateStrBn = now.toLocaleDateString("bn-BD", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        const dateStrEn = now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        const newQuestion: CommunityQuestion = {
          id: newId,
          title: input.title,
          titleEn: input.titleEn || input.title,
          description: input.description,
          descriptionEn: input.descriptionEn || input.description,
          sector: input.sector,
          cropOrAnimal: input.cropOrAnimal,
          cropOrAnimalEn: input.cropOrAnimalEn || input.cropOrAnimal,
          authorName: input.authorName,
          authorLocation: input.authorLocation,
          authorLocationEn: input.authorLocationEn || input.authorLocation,
          authorAvatar: input.authorAvatar,
          authorRole: input.authorRole,
          createdAt: dateStrBn,
          createdAtEn: dateStrEn,
          upvotes: 0,
          views: 1,
          isSolved: false,
          hasExpertAnswer: false,
          images: input.images || [],
          answers: [],
        };

        set((state) => ({
          questions: [newQuestion, ...state.questions],
        }));

        return newQuestion;
      },

      updateQuestion: (id, updates) => {
        set((state) => ({
          questions: state.questions.map((q) => (q.id === id ? { ...q, ...updates } : q)),
        }));
      },

      deleteQuestion: (id) => {
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
        }));
      },

      upvoteQuestion: (id) => {
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q
          ),
        }));
      },

      addAnswer: (questionId, input) => {
        const now = new Date();
        const dateStrBn = "এইমাত্র";
        const dateStrEn = "Just now";

        const newAnswer: CommunityAnswer = {
          id: `ans-${Date.now().toString(36)}`,
          authorId: input.authorId,
          authorName: input.authorName,
          authorTitle: input.authorTitle,
          authorAvatar: input.authorAvatar,
          isVerifiedExpert: input.isVerifiedExpert,
          registrationBadge: input.registrationBadge,
          createdAt: dateStrBn,
          createdAtEn: dateStrEn,
          content: input.content,
          contentEn: input.contentEn || input.content,
          clinicalAction: input.clinicalAction,
          clinicalActionEn: input.clinicalAction,
          upvotes: 0,
          isAccepted: false,
        };

        set((state) => ({
          questions: state.questions.map((q) => {
            if (q.id === questionId) {
              const updatedAnswers = [...q.answers, newAnswer];
              const hasExpert = updatedAnswers.some((a) => a.isVerifiedExpert);
              return {
                ...q,
                answers: updatedAnswers,
                hasExpertAnswer: hasExpert,
              };
            }
            return q;
          }),
        }));
      },

      updateAnswer: (questionId, answerId, newContent) => {
        set((state) => ({
          questions: state.questions.map((q) => {
            if (q.id === questionId) {
              return {
                ...q,
                answers: q.answers.map((a) =>
                  a.id === answerId ? { ...a, content: newContent, contentEn: newContent } : a
                ),
              };
            }
            return q;
          }),
        }));
      },

      deleteAnswer: (questionId, answerId) => {
        set((state) => ({
          questions: state.questions.map((q) => {
            if (q.id === questionId) {
              const updatedAnswers = q.answers.filter((a) => a.id !== answerId);
              const hasExpert = updatedAnswers.some((a) => a.isVerifiedExpert);
              return {
                ...q,
                answers: updatedAnswers,
                hasExpertAnswer: hasExpert,
              };
            }
            return q;
          }),
        }));
      },

      acceptAnswer: (questionId, answerId) => {
        set((state) => ({
          questions: state.questions.map((q) => {
            if (q.id === questionId) {
              return {
                ...q,
                isSolved: true,
                answers: q.answers.map((a) => ({
                  ...a,
                  isAccepted: a.id === answerId ? !a.isAccepted : a.isAccepted,
                })),
              };
            }
            return q;
          }),
        }));
      },

      upvoteAnswer: (questionId, answerId) => {
        set((state) => ({
          questions: state.questions.map((q) => {
            if (q.id === questionId) {
              return {
                ...q,
                answers: q.answers.map((a) =>
                  a.id === answerId ? { ...a, upvotes: a.upvotes + 1 } : a
                ),
              };
            }
            return q;
          }),
        }));
      },

      getQuestionById: (id) => {
        return get().questions.find((q) => q.id === id);
      },

      getQuestionsByAuthor: (authorName) => {
        const clean = authorName.toLowerCase();
        return get().questions.filter((q) => q.authorName.toLowerCase().includes(clean));
      },

      getQuestionsBySector: (sector) => {
        if (sector === "all") return get().questions;
        return get().questions.filter((q) => q.sector === sector);
      },

      resetToDefaults: () => {
        set({ questions: MOCK_COMMUNITY_QUESTIONS });
      },
    }),
    {
      name: "srot_community_store_v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

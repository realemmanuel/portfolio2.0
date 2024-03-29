"use server";

import { db } from "@/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

export const fetchAllSkils = async (): Promise<SkillsList[]> => {
  try {
    const skills: SkillsList[] = [];
    const querySnapshot = await getDocs(collection(db, "skills"));
    querySnapshot.forEach((doc) => {
      const skill = doc.data() as SkillsList;
      skills.push(skill);
    });

    return skills;
  } catch (error) {
    throw new Error();
  }
};

export const addNewSkill = async (skill: SkillsList): Promise<boolean> => {
  try {
    const skillId = `${skill.id}_${skill.name}`;
    await setDoc(doc(db, "skills", skillId), skill);
    return true;
  } catch (error) {
    throw new Error();
  }
};

export const updateExistingSkill = async (
  skillId: string,
  newValue: SkillsList
): Promise<boolean> => {
  try {
    const skillRef = doc(db, "skills", skillId);

    const updatedSkill: SkillsList = {
      id: newValue.id,
      name: newValue.name,
      logo: newValue.logo,
      isDark: newValue.isDark,
    };
    await updateDoc(skillRef, updatedSkill);

    return true;
  } catch (error) {
    throw new Error();
  }
};

export const deleteExistingSkill = async (
  skillId: string
): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, "skills", skillId));
    return true;
  } catch (error) {
    throw new Error();
  }
};

export const getResume = async (): Promise<string> => {
  try {
    const docRef = doc(db, "admin", "admin_access");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return "https://www.linkedin.com/in/emmanueloluwafunso/";
    }

    const link = docSnap.data().resumeLink as string;

    return link;
  } catch (error) {
    throw new Error();
  }
};

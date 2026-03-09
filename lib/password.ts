import bcrypt from "bcryptjs";

export const cryptPassword = async (password: string) => {
  return await bcrypt.hash(password || "", 10);
};

export const comparePassword =  async(password: string, hash: string) => {
  if(password && hash){
    return await bcrypt.compare(password, hash)
  }else{
    return false;
  }
}
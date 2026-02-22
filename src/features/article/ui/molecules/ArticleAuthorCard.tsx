import Image from "next/image";
import { getInitials } from "@/lib/utils";
import type { UserProfile } from "@/types/common";

interface ArticleAuthorCardProps {
  author: UserProfile;
}

export function ArticleAuthorCard({ author }: ArticleAuthorCardProps) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
        About the Author
      </h3>

      <div className="flex items-center gap-4 mb-4">
        {author.profile_photo ? (
          <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
            <Image
              src={author.profile_photo}
              alt={author.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-full bg-slate-blue shrink-0 flex items-center justify-center text-white font-bold text-base">
            {getInitials(author.name)}
          </div>
        )}
        <div>
          <h4 className="font-bold text-slate-900">{author.name}</h4>
          {author.profession && (
            <p className="text-xs text-slate-500 font-medium">
              {author.profession}
            </p>
          )}
        </div>
      </div>

      {author.bio && (
        <p className="text-sm text-slate-600 leading-relaxed">{author.bio}</p>
      )}
    </div>
  );
}

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

export const create = mutation({
    args: {
        access_token: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.insert("users", {
            name: "user",
            access_token: args.access_token,
        });
        return user;
    },
});

export const update = mutation({
    args: {
        name: v.string(),
        access_token: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").filter(q => q.eq(q.field("access_token"), args.access_token)).first();
        if (user) {
            await ctx.db.patch(user._id, { name: args.name });
        }
    },
});

export const getUserByTargetId = query({
    args: {
        targetId: v.id("targets"),
    },
    handler: async (ctx, args) => {
        const target = await ctx.db.get(args.targetId);
        return await ctx.db.get(target?.userId as Id<"users">);
    },
});


export const getUserByAccessToken = query({
    args: {
        access_token: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").filter(q => q.eq(q.field("access_token"), args.access_token)).first()
        const targets = await ctx.db.query("targets").filter(q => q.eq(q.field("userId"), user?._id)).collect();
        const sum = targets.reduce((acc, target) => acc + target.collected, 0);

        return {
            ...user,
            targets,
            sum,
        };
    },
});
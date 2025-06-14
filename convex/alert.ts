import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByUser = query({
    args: {
        access_token: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").filter(q => q.eq(q.field("access_token"), args.access_token)).first()
        return await ctx.db.query("alerts").filter(q => q.eq(q.field("userId"), user?._id)).collect();
    },
});

export const create = mutation({
    args: {
        access_token: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").filter(q => q.eq(q.field("access_token"), args.access_token)).first()
        await ctx.db.insert("alerts", {
            backgroundColor: "#000000",
            textColor: "#000000",
            userId: user?._id!,
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("alerts"),
        backgroundColor: v.string(),
        textColor: v.string(),
        access_token: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").filter(q => q.eq(q.field("access_token"), args.access_token)).first()
        await ctx.db.patch(args.id, {
            backgroundColor: args.backgroundColor,
            textColor: args.textColor,
            userId: user?._id!,
        });
    },
});

export const remove = mutation({
    args: {
        id: v.id("alerts"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});


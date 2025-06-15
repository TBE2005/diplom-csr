import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db.query("users").collect();
        const targets = await ctx.db.query("targets").collect();
        return targets.map((target) => ({
            ...target,
            user: users.find((user) => user._id === target.userId)
        }))
    },
});

export const getSumTargets = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const targets = await ctx.db.query("targets").filter(q => q.eq(q.field("userId"), args.userId)).collect();
        const sum = targets.reduce((acc, target) => acc + target.collected, 0);
        return sum;
    },
});

export const getById = query({
    args: {
        id: v.id("targets"),
    },
    handler: async (ctx, args) => {
        const target = await ctx.db.get(args.id);
        const userTarget = await ctx.db.query("users").filter(q => q.eq(q.field("_id"), target?.userId)).first();
        return { ...target, user: userTarget };
    },
});

export const create = mutation({
    args: {
        access_token: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").filter(q => q.eq(q.field("access_token"), args.access_token)).first()

        await ctx.db.insert("targets", {
            name: "Новая цель",
            collected: 10,
            total: 100,
            userId: user?._id!,
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("targets"),
        name: v.string(),
        collected: v.number(),
        total: v.number(),
        goalId: v.id("goals"),
        alertId: v.id("alerts"),
        access_token: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").filter(q => q.eq(q.field("access_token"), args.access_token)).first()

        await ctx.db.patch(args.id, {
            name: args.name,
            collected: args.collected,
            total: args.total,
            goalId: args.goalId,
            alertId: args.alertId,
            userId: user?._id!,
        });
    },
});

export const remove = mutation({
    args: {
        id: v.id("targets"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const getByUser = query({
    args: {
        access_token: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").filter(q => q.eq(q.field("access_token"), args.access_token)).first()
        return await ctx.db.query("targets").filter(q => q.eq(q.field("userId"), user?._id)).collect();
    },
});

export const getWithGoal = query({
    args: {
        targetId: v.id("targets"),
    },
    handler: async (ctx, args) => {
        const target = await ctx.db.query("targets").filter(q => q.eq(q.field("_id"), args.targetId)).first();
        const goal = await ctx.db.query("goals").filter(q => q.eq(q.field("_id"), target?.goalId)).first();
        return { ...target, goal: goal };
    },
});


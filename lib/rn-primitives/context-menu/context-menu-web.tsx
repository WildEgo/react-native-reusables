import * as ContextMenu from '@radix-ui/react-context-menu';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import * as Slot from '~/lib/rn-primitives/slot/slot-native';
import { useTrigger } from '../hooks/useTrigger';
import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '../types';
import type {
  ContextMenuCheckboxItemProps,
  ContextMenuItemProps,
  ContextMenuOverlayProps,
  ContextMenuPortalProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuRootProps,
  ContextMenuSeparatorProps,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
} from './types';

const Root = React.forwardRef<
  ViewRef,
  SlottableViewProps & ContextMenuRootProps
>(({ asChild, open: _open, onOpenChange, ...viewProps }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <ContextMenu.Root onOpenChange={onOpenChange}>
      <Component ref={ref} {...viewProps} />
    </ContextMenu.Root>
  );
});

Root.displayName = 'RootWebContextMenu';

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  (
    {
      asChild,
      onLongPress: onLongPressProp,
      disabled = false,
      onAccessibilityAction: onAccessibilityActionProp,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <ContextMenu.Trigger disabled={disabled ?? undefined} asChild>
        <Component ref={ref} {...props} />
      </ContextMenu.Trigger>
    );
  }
);

Trigger.displayName = 'TriggerWebContextMenu';

/**
 * @warning when using a custom `<PortalHost />`, you will have to adjust the Content's sideOffset to account for nav elements like headers.
 */
function Portal({ forceMount, container, children }: ContextMenuPortalProps) {
  return (
    <ContextMenu.Portal
      forceMount={forceMount}
      container={container}
      children={children}
    />
  );
}

/**
 * Platform: NATIVE ONLY
 */
const Overlay = React.forwardRef<
  PressableRef,
  SlottablePressableProps & ContextMenuOverlayProps
>(() => {
  return null;
});

Overlay.displayName = 'OverlayWebContextMenu';

const Content = React.forwardRef<
  PressableRef,
  SlottablePressableProps & PositionedContentProps
>(
  (
    {
      asChild = false,
      forceMount,
      align: _align,
      side: _side,
      sideOffset: _sideOffset,
      alignOffset = 0,
      avoidCollisions = true,
      insets,
      loop,
      onCloseAutoFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      collisionBoundary,
      sticky,
      hideWhenDetached,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <ContextMenu.Content
        forceMount={forceMount}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        collisionPadding={insets}
        loop={loop}
        onCloseAutoFocus={onCloseAutoFocus}
        onEscapeKeyDown={onEscapeKeyDown}
        onPointerDownOutside={onPointerDownOutside}
        onFocusOutside={onFocusOutside}
        onInteractOutside={onInteractOutside}
        collisionBoundary={collisionBoundary}
        sticky={sticky}
        hideWhenDetached={hideWhenDetached}
      >
        <Component ref={ref} {...props} />
      </ContextMenu.Content>
    );
  }
);

Content.displayName = 'ContentWebContextMenu';

const Item = React.forwardRef<
  PressableRef,
  SlottablePressableProps & ContextMenuItemProps
>(({ asChild, textValue, closeOnPress = true, ...props }, ref) => {
  const { buttonRef, hideHtmlButtonProps, pressableProps } =
    useTrigger<HTMLDivElement>(props);

  function onSelected(ev: Event) {
    ev.preventDefault();
  }
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <>
      <ContextMenu.Item
        ref={buttonRef}
        textValue={textValue}
        disabled={props.disabled ?? undefined}
        onSelect={closeOnPress ? undefined : onSelected}
        {...hideHtmlButtonProps}
      />
      <ContextMenu.Item
        textValue={textValue}
        disabled={props.disabled ?? undefined}
        asChild
      >
        <Component ref={ref} {...pressableProps} />
      </ContextMenu.Item>
    </>
  );
});

Item.displayName = 'ItemWebContextMenu';

const Group = React.forwardRef<ViewRef, SlottableViewProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <ContextMenu.Group asChild>
        <Component ref={ref} {...props} />
      </ContextMenu.Group>
    );
  }
);

Group.displayName = 'GroupWebContextMenu';

const Label = React.forwardRef<TextRef, SlottableTextProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Text : Text;
    return (
      <ContextMenu.Label asChild>
        <Component ref={ref} {...props} />
      </ContextMenu.Label>
    );
  }
);

Label.displayName = 'LabelWebContextMenu';

const CheckboxItem = React.forwardRef<
  PressableRef,
  SlottablePressableProps & ContextMenuCheckboxItemProps
>(
  (
    {
      asChild,
      checked,
      onCheckedChange,
      textValue,
      disabled = false,
      closeOnPress = true,
      ...props
    },
    ref
  ) => {
    const { buttonRef, hideHtmlButtonProps, pressableProps } =
      useTrigger<HTMLDivElement>({
        ...props,
        onKeyDown(ev) {
          if (ev.key === ' ') {
            buttonRef.current?.click();
          }
        },
      });

    function onSelected(ev: Event) {
      ev.preventDefault();
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <>
        <ContextMenu.CheckboxItem
          ref={buttonRef}
          textValue={textValue}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled ?? undefined}
          onSelect={closeOnPress ? undefined : onSelected}
          {...hideHtmlButtonProps}
        />
        <ContextMenu.CheckboxItem
          textValue={textValue}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled ?? undefined}
          asChild
        >
          <Component ref={ref} {...pressableProps} />
        </ContextMenu.CheckboxItem>
      </>
    );
  }
);

CheckboxItem.displayName = 'CheckboxItemWebContextMenu';

const RadioGroup = React.forwardRef<
  ViewRef,
  SlottableViewProps & ContextMenuRadioGroupProps
>(({ asChild, value, onValueChange, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <ContextMenu.RadioGroup value={value} onValueChange={onValueChange} asChild>
      <Component ref={ref} {...props} />
    </ContextMenu.RadioGroup>
  );
});

RadioGroup.displayName = 'RadioGroupWebContextMenu';

const RadioItem = React.forwardRef<
  PressableRef,
  SlottablePressableProps & ContextMenuRadioItemProps
>(({ asChild, value, textValue, closeOnPress = true, ...props }, ref) => {
  const { buttonRef, hideHtmlButtonProps, pressableProps } =
    useTrigger<HTMLDivElement>(props);

  function onSelected(ev: Event) {
    ev.preventDefault();
  }

  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <>
      <ContextMenu.RadioItem
        ref={buttonRef}
        value={value}
        textValue={textValue}
        disabled={props.disabled ?? undefined}
        onSelect={closeOnPress ? undefined : onSelected}
        {...hideHtmlButtonProps}
      />
      <ContextMenu.RadioItem
        value={value}
        textValue={textValue}
        disabled={props.disabled ?? undefined}
        asChild
      >
        <Component ref={ref} {...pressableProps} />
      </ContextMenu.RadioItem>
    </>
  );
});

RadioItem.displayName = 'RadioItemWebContextMenu';

const ItemIndicator = React.forwardRef<
  ViewRef,
  SlottableViewProps & ForceMountable
>(({ asChild, forceMount, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <ContextMenu.ItemIndicator forceMount={forceMount} asChild>
      <Component ref={ref} role='presentation' {...props} />
    </ContextMenu.ItemIndicator>
  );
});

ItemIndicator.displayName = 'ItemIndicatorWebContextMenu';

const Separator = React.forwardRef<
  ViewRef,
  SlottableViewProps & ContextMenuSeparatorProps
>(({ asChild, decorative, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <ContextMenu.Separator asChild>
      <Component ref={ref} {...props} />
    </ContextMenu.Separator>
  );
});

Separator.displayName = 'SeparatorWebContextMenu';

const Sub = React.forwardRef<ViewRef, SlottableViewProps & ContextMenuSubProps>(
  ({ asChild, open, onOpenChange, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <ContextMenu.Sub open={open} onOpenChange={onOpenChange}>
        <Component ref={ref} {...props} />
      </ContextMenu.Sub>
    );
  }
);

Sub.displayName = 'SubWebContextMenu';

const SubTrigger = React.forwardRef<
  PressableRef,
  SlottablePressableProps & ContextMenuSubTriggerProps
>(({ asChild, textValue, disabled = false, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <ContextMenu.SubTrigger
      disabled={disabled ?? undefined}
      textValue={textValue}
      asChild
    >
      <Component ref={ref} {...props} />
    </ContextMenu.SubTrigger>
  );
});

SubTrigger.displayName = 'SubTriggerWebContextMenu';

const SubContent = React.forwardRef<
  ViewRef,
  SlottableViewProps & ForceMountable
>(({ asChild = false, forceMount, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <ContextMenu.Portal>
      <ContextMenu.SubContent forceMount={forceMount}>
        <Component ref={ref} {...props} />
      </ContextMenu.SubContent>
    </ContextMenu.Portal>
  );
});

Content.displayName = 'ContentWebContextMenu';

export {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Overlay,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
};
